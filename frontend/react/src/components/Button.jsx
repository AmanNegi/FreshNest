import { useNavigate } from 'react-router-dom'

function NavigationButton ({
  text = 'Button',
  additionalClasses = '',
  path = '/'
}) {
  const navigate = useNavigate()
  return (
    <button
      className="btn btn-accent text-white font-light"
      onClick={() => {
        navigate(path)
      }}
    >
      {text}
    </button>
  )
}

export function ClickActionButton ({
  text = 'Button',
  additionalClasses = '',
  onClick
}) {
  return (
    <button className="btn btn-accent text-white font-light" onClick={onClick}>
      {text}
    </button>
  )
}

export default NavigationButton
