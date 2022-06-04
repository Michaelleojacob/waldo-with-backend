const Tooltip = ({ tooltip }) => {
  return (
    <div id='tooltip-container'>
      <div className={tooltip.text.trim() === '' ? 'hide-tt' : 'display-tt'}>
        <div className={tooltip.status ? 'success' : 'danger'}>
          {tooltip.text}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
