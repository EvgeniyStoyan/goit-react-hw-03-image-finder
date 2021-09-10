import s from './Button.module.css';

function Button({ handleLoadMore }) {
  return (
    <div className={s.ButtonLoadMore}>
      <button type="button" className={s.Button} onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
}

export default Button;
