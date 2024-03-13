import './index.css'

const LanguageFilterItem = props => {
  const {eachBtn, onChangeLanguage, selectedLang} = props
  const {language, id} = eachBtn
  const onSelected = () => {
    onChangeLanguage(id)
  }
  const classname = selectedLang === id ? 'selected-btn' : 'normal-btn'
  return (
    <li className="btn-li">
      <button className={classname} onClick={onSelected} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
