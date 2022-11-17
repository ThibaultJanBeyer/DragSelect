import React, { useState } from 'react'

import styles from './BeautyButton.module.css'

type Props = React.PropsWithChildren<{
  href?: string
  isPrimary?: boolean
  isLoading?: boolean
  isError?: boolean
  isSuccess?: boolean
  disabled?: boolean
  onClick?: () => void
}>

export const BeautyButton: React.FC<Props> = ({
  children,
  href,
  isPrimary = true,
  onClick,
  isLoading,
  isError,
  isSuccess,
  disabled,
}) => {
  const [loading, setLoading] = useState(isLoading)

  const loadingStatus = isLoading || loading

  const className = `${isPrimary ? styles.btn : styles.btnAlt} ${
    loadingStatus && styles.btnLoading
  } ${isError && styles.btnError} ${isSuccess && styles.btnSuccess}`
  const child = isPrimary ? (
    <span className={styles.btnHelper}>{children}</span>
  ) : (
    children
  )

  if (!href)
    return (
      <button
        className={className}
        onClick={onClick}
        disabled={disabled || loadingStatus}
      >
        {child}
      </button>
    )

  return (
    <a
      href={href}
      onClick={() => (disabled || loadingStatus ? null : setLoading(true))}
      className={className}
    >
      {child}
    </a>
  )
}
