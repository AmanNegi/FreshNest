import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavigationButton({ text = 'Button', additionalClasses = '', path = '/' }) {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-accent text-white font-light"
      onClick={() => {
        navigate(path);
      }}
    >
      {text}
    </button>
  );
}

NavigationButton.propTypes = {
  text: PropTypes.string.isRequired,
  additionalClasses: PropTypes.string,
  path: PropTypes.string.isRequired
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
  );
}


ClickActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  additionalClasses: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default NavigationButton

