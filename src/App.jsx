import AllContactList from './components/AllContact/AllContactList';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';


function App () {
  return (
    <>
      <div className={styles['title']}>Contact list</div>
      <div className={styles['list-and-redaction-div']}>
        <AllContactList />
        <ContactForm />
      </div>
    </>
  );
}

export default App;
