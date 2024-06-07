import React from 'react'

export default function LoaderWithModal() {
  return (
    <div className="modal show d-block">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
