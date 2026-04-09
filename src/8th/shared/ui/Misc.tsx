'use client'

import {
  BoxStyled,
  DivideLineStyle,
  DivideStyle,
  GapStyle,
  SelectBoxStyle,
  TextDivStyled,
  TextSpanStyled,
} from '../styled/SharedStyled'

/**
 * 그밖에 다양한 컴포넌트
 */

export function BoxStyle({
  onClick,
  children,
  id,
  className,
  padding,
  margin,
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  border,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderStyle,
  borderWidth,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor = 'primary',
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat = 'no-repeat',
  backgroundAttachment,
  backgroundClip,
  backgroundOrigin,
  boxShadow,
  overflow,
  overflowX,
  overflowY,
  transform,
  opacity,
  visibility,
  cursor,
  // Text properties
  textAlign,
  lineHeight,
  letterSpacing,
  wordSpacing,
  textDecoration,
  textTransform,
  whiteSpace,
  wordBreak,
  textOverflow,
  verticalAlign,
  // Box model
  boxSizing,
  // Flex properties
  display,
  flexDirection = 'row',
  alignItems,
  justifyContent,
  flexWrap,
  gap,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  // Grid properties
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridAutoColumns,
  gridAutoRows,
  gridAutoFlow,
  placeItems,
  placeContent,
  // Transition and animation
  transition,
  transitionProperty,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
  animation,
  animationName,
  animationDuration,
  animationTimingFunction,
  animationDelay,
  animationIterationCount,
  animationDirection,
  animationFillMode,
  animationPlayState,
  // Scroll behavior
  scrollBehavior,
  scrollbarWidth,
  scrollbarColor,
  // Pseudo selectors
  hover,
  focus,
  active,
  before,
  after,
}: {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  id?: string
  padding?: string
  margin?: string
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  border?: string
  borderRadius?: string | number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderWidth?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  borderColor?: 'primary' | 'secondary' | 'gray' | 'lightBlue'
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  backgroundAttachment?: 'scroll' | 'fixed' | 'local'
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box'
  backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box'
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'
  boxShadow?: string
  transform?: string
  opacity?: number
  visibility?: 'visible' | 'hidden' | 'collapse'
  cursor?:
    | 'auto'
    | 'default'
    | 'none'
    | 'context-menu'
    | 'help'
    | 'pointer'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'move'
    | 'no-drop'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    | 'e-resize'
    | 'n-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'w-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'col-resize'
    | 'row-resize'
    | 'all-scroll'
  // Text properties
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
  lineHeight?: string | number
  letterSpacing?: string
  wordSpacing?: string
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  whiteSpace?:
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-wrap'
    | 'pre-line'
    | 'break-spaces'
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
  textOverflow?: 'clip' | 'ellipsis' | string
  verticalAlign?:
    | 'baseline'
    | 'sub'
    | 'super'
    | 'top'
    | 'text-top'
    | 'middle'
    | 'bottom'
    | 'text-bottom'
  // Box model
  boxSizing?: 'content-box' | 'border-box'
  // Flex properties
  display?:
    | 'block'
    | 'flex'
    | 'grid'
    | 'inline'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid'
    | 'none'
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number
  flex?: string
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string
  // Grid properties
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridTemplateAreas?: string
  gridAutoColumns?: string
  gridAutoRows?: string
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense'
  placeItems?: 'start' | 'end' | 'center' | 'stretch'
  placeContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  // Transition and animation
  transition?: string
  transitionProperty?: string
  transitionDuration?: string
  transitionTimingFunction?: string
  transitionDelay?: string
  animation?: string
  animationName?: string
  animationDuration?: string
  animationTimingFunction?: string
  animationDelay?: string
  animationIterationCount?: string | number
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  animationPlayState?: 'running' | 'paused'
  // Scroll behavior
  scrollBehavior?: 'auto' | 'smooth'
  scrollbarWidth?: 'auto' | 'thin' | 'none'
  scrollbarColor?: string
  // Pseudo selectors
  hover?: React.CSSProperties
  focus?: React.CSSProperties
  active?: React.CSSProperties
  before?: React.CSSProperties
  after?: React.CSSProperties
}) {
  return (
    <BoxStyled
      className={className}
      onClick={onClick}
      id={id}
      padding={padding}
      margin={margin}
      width={width}
      height={height}
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      maxHeight={maxHeight}
      border={border}
      borderRadius={
        borderRadius
          ? typeof borderRadius === 'number'
            ? borderRadius
            : parseInt(borderRadius)
          : undefined
      }
      borderTopLeftRadius={borderTopLeftRadius}
      borderTopRightRadius={borderTopRightRadius}
      borderBottomLeftRadius={borderBottomLeftRadius}
      borderBottomRightRadius={borderBottomRightRadius}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      borderTop={borderTop}
      borderRight={borderRight}
      borderBottom={borderBottom}
      borderLeft={borderLeft}
      borderColor={borderColor}
      position={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      zIndex={zIndex}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      backgroundSize={backgroundSize}
      backgroundPosition={backgroundPosition}
      backgroundRepeat={backgroundRepeat}
      backgroundAttachment={backgroundAttachment}
      backgroundClip={backgroundClip}
      backgroundOrigin={backgroundOrigin}
      overflow={overflow}
      overflowX={overflowX}
      overflowY={overflowY}
      boxShadow={boxShadow}
      transform={transform}
      opacity={opacity}
      visibility={visibility}
      cursor={cursor}
      // Text properties
      textAlign={textAlign}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      wordSpacing={wordSpacing}
      textDecoration={textDecoration}
      textTransform={textTransform}
      whiteSpace={whiteSpace}
      wordBreak={wordBreak}
      textOverflow={textOverflow}
      verticalAlign={verticalAlign}
      // Box model
      boxSizing={boxSizing}
      // Flex properties
      display={display}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      gap={gap}
      flex={flex}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      flexBasis={flexBasis}
      // Grid properties
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={gridTemplateRows}
      gridTemplateAreas={gridTemplateAreas}
      gridAutoColumns={gridAutoColumns}
      gridAutoRows={gridAutoRows}
      gridAutoFlow={gridAutoFlow}
      placeItems={placeItems}
      placeContent={placeContent}
      // Transition and animation
      transition={transition}
      transitionProperty={transitionProperty}
      transitionDuration={transitionDuration}
      transitionTimingFunction={transitionTimingFunction}
      transitionDelay={transitionDelay}
      animation={animation}
      animationName={animationName}
      animationDuration={animationDuration}
      animationTimingFunction={animationTimingFunction}
      animationDelay={animationDelay}
      animationIterationCount={animationIterationCount}
      animationDirection={animationDirection}
      animationFillMode={animationFillMode}
      animationPlayState={animationPlayState}
      // Scroll behavior
      scrollBehavior={scrollBehavior}
      scrollbarWidth={scrollbarWidth}
      scrollbarColor={scrollbarColor}
      // Pseudo selectors
      hover={hover}
      focus={focus}
      active={active}
      before={before}
      after={after}>
      {children}
    </BoxStyled>
  )
}

export function TextStyle({
  children,
  className,
  padding = '0',
  margin = '0',
  width = 'fit-content',
  height = 'fit-content',
  fontSize = 'basic',
  fontWeight = 'normal',
  fontColor = 'primary',
  type = 'div',
  onClick,
  fontFamily = 'round',
  textAlign,
}: {
  children: React.ReactNode
  className?: string
  padding?: string
  margin?: string
  width?: string
  height?: string
  fontSize?:
    | 'basic'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | string
  fontWeight?: 'normal' | 'bold' | 'bolder' | number
  fontColor?:
    | 'primary'
    | 'primaryShadow'
    | 'secondary'
    | 'darkBlue'
    | 'lightBlue'
    | string
  fontFamily?: 'round' | 'sans' | 'rg-b'
  type?: 'div' | 'span'
  onClick?: () => void
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
}) {
  return (
    <>
      {type === 'div' ? (
        <TextDivStyled
          className={className}
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontColor={fontColor}
          fontFamily={fontFamily}
          onClick={onClick}
          textAlign={textAlign}>
          {children}
        </TextDivStyled>
      ) : (
        <TextSpanStyled
          className={className}
          padding={padding}
          margin={margin}
          width={width}
          height={height}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontColor={fontColor}
          fontFamily={fontFamily}
          onClick={onClick}
          textAlign={textAlign}>
          {children}
        </TextSpanStyled>
      )}
    </>
  )
}

export function Divide({ title = "Today's Pick" }: { title?: string }) {
  return (
    <DivideStyle>
      <DivideLineStyle />
      <TextStyle fontColor="secondary">{title}</TextStyle>
      <DivideLineStyle />
    </DivideStyle>
  )
}

export function Gap({ size = 10 }: { size?: number }) {
  return <GapStyle size={size} />
}

interface SelectBoxProps {
  selectedValue: string
  onChange: (value: { key: string; label: string }) => void
  options: { key: string; label: string }[]
  optionSubtext?: string
  largeFont?: boolean
  smallFont?: boolean
  placeholder?: string
  minWidth?: number
}

export function SelectBox({
  selectedValue,
  onChange,
  options,
  optionSubtext,
  largeFont = false,
  smallFont = false,
  placeholder = 'Select',
  minWidth = 0,
}: SelectBoxProps) {
  return (
    <SelectBoxStyle largeFont={largeFont} smallFont={smallFont}>
      <select
        style={{ minWidth: `${minWidth}px` }}
        value={selectedValue}
        onChange={(e) => {
          const findItem = options!.find(
            (item) => item.label === e.target.value,
          )
          if (findItem) {
            if (onChange) {
              onChange(findItem)
            }
          }
        }}>
        {!selectedValue && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options!.map((option) => (
          <option
            key={option.key}
            value={option.label}
            style={{ fontFamily: 'system-ui' }}>
            {option.label}
            {optionSubtext}
          </option>
        ))}
      </select>
    </SelectBoxStyle>
  )
}

export function StreakLine() {
  return (
    <BoxStyle
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      margin="10px 0">
      <BoxStyle
        width="8px"
        height="8px"
        backgroundColor="#E9EDF3"
        borderRadius={100}
      />
      <BoxStyle
        width="3px"
        height="20px"
        backgroundColor="#E9EDF3"
        margin="auto"
        borderRadius={100}
      />
      <BoxStyle
        width="8px"
        height="8px"
        backgroundColor="#E9EDF3"
        borderRadius={100}
      />
    </BoxStyle>
  )
}
