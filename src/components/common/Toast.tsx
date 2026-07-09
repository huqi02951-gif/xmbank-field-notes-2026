import { useEffect } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 2500)

    return () => window.clearTimeout(timer)
  }, [message, onDismiss])

  return (
    <div className="toast" role="status">
      <span>{message}</span>
      <button type="button" onClick={onDismiss} aria-label="关闭提示">
        ×
      </button>
    </div>
  )
}
