/*
 * Copyright (c) 2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  withStyles,
  WithStyles
} from "@material-ui/core"
import * as React from "react"
import { Link, LinkProps } from "react-router-dom"
import {
  compose,
  pure,
  withHandlers
} from "recompose"

import {
  withNotification,
  WithNotificationDispatch
} from "enhancers"

import { styles, Styles } from "./TextLink.styles"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Text link properties
 */
export type TextLinkProps = LinkProps

/* ------------------------------------------------------------------------- */

/**
 * Text link handler properties
 */
interface HandlerProps {
  handleClick(): void                  /* Link click handler */
}

/* ------------------------------------------------------------------------- */

/**
 * Text link render properties
 */
export type RenderProps =
  & WithStyles<Styles>
  & WithNotificationDispatch
  & TextLinkProps
  & HandlerProps

/* ----------------------------------------------------------------------------
 * Presentational component
 * ------------------------------------------------------------------------- */

/**
 * Text link render component
 *
 * @param props - Properties
 *
 * @return JSX element
 */
export const Render: React.SFC<RenderProps> =
  ({ classes, children, handleClick, to, tabIndex }) =>
    <Link
      className={classes.root} onClickCapture={handleClick}
      to={to} tabIndex={tabIndex}
    >
      {children}
    </Link>

/* ----------------------------------------------------------------------------
 * Enhanced component
 * ------------------------------------------------------------------------- */

/**
 * Text link component
 */
export const TextLink =
  compose<RenderProps, TextLinkProps>(
    withStyles(styles),
    withNotification(),
    withHandlers<WithNotificationDispatch, HandlerProps>({
      handleClick: ({ dismissNotification }) => dismissNotification
    }),
    pure
  )(Render)
