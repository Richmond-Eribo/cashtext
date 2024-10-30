interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <>
      <button className="custom-button" {...rest}>
        {children}
      </button>
      <style>{`
        .custom-button {
          border: none;
          display: flex;
          text-transform: capitalize;
          padding: 14px 20px;
          justify-content: center;
          align-items: center;
          border-radius: 73px;
          background: var(--Base-Secondary);
          color: var(--Base-White);
          text-align: center;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 90%;
        }
      `}</style>
    </>
  )
}

export default Button
