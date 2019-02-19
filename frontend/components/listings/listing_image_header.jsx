import React, {Component} from 'react';
import Modal from 'react-modal';

class ListingImageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      photoIdx: 0,
      photoUrls: props.photos
    }
  }

  toggleModal = () => this.setState({modalOpen: !this.state.modalOpen})

  setPhotoIdx = (idx) => {
    this.setState({photoIdx: idx, modalOpen: true});
  }
  
  nextPhoto = () => {
    const { photoIdx, photoUrls } = this.state;
    if(photoUrls.length - 2 < photoIdx) return;
    this.setState({photoIdx: ++this.state.photoIdx});
  }

  prevPhoto = () => {
    const { photoIdx } = this.state;
    if(photoIdx == 0) return;
    this.setState({photoIdx: --this.state.photoIdx});
  }

  render() {
    const thumbIdx = 0;
    const { photoIdx, photoUrls } = this.state;
    
    return (
      <>
      <section onClick={this.toggleModal} className="image-header-container flush-top flex-container">
        { photoUrls.filter((_,idx) => idx === thumbIdx)
            .map((url, idx) => 
            <div className="hero-image-wrapper grid--50" key={idx}>
              <div className="left-half hero-image" onClick={() => this.setPhotoIdx(idx)} style={{backgroundImage: `url(${url})`}}></div>
            </div>) 
        }
        <div className="right-half grid--50">
          { photoUrls ? photoUrls.filter((_,idx) => idx !== thumbIdx)
            .map((url, idx) => {
              if(idx < 4) {
                return (
                  <div className="square-image-wrapper grid--50" key={idx}>
                    <div className="square-image" onClick={() => this.setPhotoIdx(idx+1)} style={{backgroundImage: `url(${url})`}}>
                      <div className="photo-overlay"></div>
                    </div>
                  </div>
                )
              }
            })
          : null}
        </div>
      </section>
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.toggleModal}
        shouldCloseOnOverlayClick={true}
        className="modal image-slider-modal"
        overlayClassName="Overlay">
        <div className="listing-modal-images-container">
          <>
            { photoIdx > 0 && 
              <button className="button--prev" onClick={this.prevPhoto}> 
                <i className="fa fa-chevron-left fa-3x"></i> 
              </button>
            }
            { photoUrls.length - 1 > photoIdx && 
              <button className="button--next" onClick={this.nextPhoto}> 
                <i className="fa fa-chevron-right fa-3x"></i> 
              </button> 
            }
            <img src={photoUrls[photoIdx]} className="modal-photo" /> 
          </>
        </div>
      </Modal>
      </>
    )
  }
}


export default ListingImageHeader;
