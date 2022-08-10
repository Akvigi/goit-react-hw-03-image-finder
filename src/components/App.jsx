import React, { Component } from "react";
import fetchIMG from "Service/api";
import Gallery from "./Gallery/Gallery";
import SearchForm from "./Search/SearchForm";
import styles from "./App.module.css"
import { ThreeDots } from 'react-loader-spinner'
import Modal from "./Gallery/Modal";

const PER_PAGE = 20;

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    loadMore: false,
    modal: null,
  }
  
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);

    }
  } 

  getImages = async (query, page) => {
    this.setState({ isLoading: true })
    try {
      await fetchIMG(query, page).then(({ hits, totalHits }) => {
         this.setState(prevState =>( { images: [...prevState.images, ...hits], loadMore: page < Math.ceil(totalHits/PER_PAGE) }))
      })  
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onHandleSubmit = (value) => {
    if (value === this.state.query) {
      return;
    }  
    this.setState({
      query: value,
      page: 1,
      images: [],
      isVisible: false,
      isEmpty: false,
      error: null,
    }); 
  }

  onHandleInput = (e) => {
    this.setState({query: e.currentTarget.value.toLowerCase().trim()})
  }

  onHandleLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
  }

  showModal = (src, alt) => {
    this.setState({modal: {src: src, alt: alt}})
  }

  unshowModal = () => {
    this.setState({modal: null})
  }

  render() {
    const {images, loadMore, isLoading, modal} = this.state
    return (
      <div className={styles.App}>
        <SearchForm onSubmitFunc={this.onHandleSubmit} />
        <Gallery array={images} showModal={this.showModal} />
        {isLoading && <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>}
        {loadMore && <button onClick={this.onHandleLoadMore}>Load more</button>}
        {modal !== null && <Modal src={modal.src} alt={modal.alt} unshowModal={this.unshowModal} />}
      </div>
    );
  }
}

export default App;
