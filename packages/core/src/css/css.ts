import type { Dict } from "@yamada-ui/utils"
import { isArray, isObject, merge, runIfFunc } from "@yamada-ui/utils"
import type { ConfigProps } from "../config"
import { pseudos } from "../pseudos"
import { processSkipProperties, styles } from "../styles"
import type { StyledTheme } from "../theme.types"
import type { BreakpointQueries } from "./breakpoint"
import type { CSSObjectOrFunc, CSSUIObject } from "./css.types"

const isProcessSkip = (key: string) => processSkipProperties.includes(key)

const expandColorMode = (key: string, value: any[]): Dict => ({
  [key]: value[0],
  [pseudos._dark]: {
    [key]: value[1],
  },
})

const expandResponsive = (
  key: string,
  value: Dict,
  queries: BreakpointQueries,
): Dict =>
  queries.reduce((prev, { breakpoint, query }) => {
    const breakpointValue = value[breakpoint]

    if (query) {
      prev[query] = { [key]: breakpointValue }
    } else {
      prev[key] = value[breakpoint]
    }

    return prev
  }, {} as Dict)

const expandCSS =
  (css: Dict, isNested: boolean) =>
  (theme: StyledTheme): Dict => {
    if (!theme.__breakpoints) return css

    const { isResponsive, queries } = theme.__breakpoints

    let computedCSS: Dict = {}

    for (let [key, value] of Object.entries(css)) {
      value = runIfFunc(value, theme)

      if (value == null) continue

      if (isArray(value) && !(isProcessSkip(key) && !isNested)) {
        computedCSS = merge(computedCSS, expandColorMode(key, value))

        continue
      }

      if (
        isObject(value) &&
        isResponsive(value) &&
        !(isProcessSkip(key) && !isNested)
      ) {
        computedCSS = merge(computedCSS, expandResponsive(key, value, queries))

        continue
      }

      computedCSS[key] = value
    }

    return computedCSS
  }

export const getCSS = ({
  theme,
  styles = {},
  pseudos = {},
}: {
  theme: StyledTheme
  styles: Dict
  pseudos: Dict
}): ((cssOrFunc: CSSObjectOrFunc | CSSUIObject) => Dict) => {
  const createCSS = (
    cssOrFunc: CSSObjectOrFunc | CSSUIObject,
    isNested: boolean = false,
  ): Dict => {
    const css = runIfFunc(cssOrFunc, theme)
    const computedCSS = expandCSS(css, isNested)(theme)

    let resolvedCSS: Dict = {}

    for (let [key, value] of Object.entries(computedCSS)) {
      value = runIfFunc(value, theme)

      if (value == null) continue

      if (key in pseudos) key = pseudos[key]

      let style: ConfigProps | undefined | true = styles[key]

      if (style === true) style = { properties: key }

      if (isObject(value) && !style?.isProcessSkip) {
        resolvedCSS[key] = resolvedCSS[key] ?? {}
        resolvedCSS[key] = merge(resolvedCSS[key], createCSS(value, true))

        continue
      }

      value = style?.transform?.(value, theme) ?? value

      if (style?.isProcessResult || style?.isProcessSkip)
        value = createCSS(value, true)

      if (!isNested && style?.static) {
        const staticStyles = runIfFunc(style.static, theme)

        resolvedCSS = merge(resolvedCSS, staticStyles)
      }

      const properties = runIfFunc(style?.properties, theme)

      if (properties) {
        if (isArray(properties)) {
          for (const property of properties) {
            resolvedCSS[property] = value
          }

          continue
        } else if (isObject(value)) {
          resolvedCSS = merge(resolvedCSS, value)

          continue
        } else {
          resolvedCSS[properties] = value

          continue
        }
      }

      if (isObject(value)) {
        resolvedCSS = merge(resolvedCSS, value)

        continue
      }

      resolvedCSS[key] = value
    }

    return resolvedCSS
  }

  return createCSS
}

export const css =
  (cssObject: CSSObjectOrFunc | CSSUIObject) =>
  (theme: StyledTheme): Dict =>
    getCSS({
      theme,
      styles,
      pseudos,
    })(cssObject)
