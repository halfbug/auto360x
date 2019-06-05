
export const createCompany = (Company) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('Companies').add({
      ...Company,
      isActive: true,
      createdBy: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_Company_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_Company_ERROR' }, err);
    });
  }
};



export const saveSelectedSlide = (selectedSlideTimestamp) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    firestore.collection('selectedTimestamp').add({
      ...selectedSlideTimestamp
    }).then(() => {
//find Company slide with match timestamp
// console.log(selectedSlideTimestamp)
const selSlide = firestore.collection('slides')
.where("CompanyId","==","Companys/"+selectedSlideTimestamp.CompanyId)
.where("timestamp","==",selectedSlideTimestamp.timestamp)
.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(slide) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(slide.id, " => ", slide.data());
      firestore.collection('selectedSlides').add({
       uid : getState().firebase.auth.uid,
       slideId : slide.id
      }).then(() => {

        dispatch({ type: 'CREATE_SELECTED_TIMESTAMP_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_SELECTED_TIMESTAMP_ERROR' }, err);
      });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});
//.where("timestamp", "==", selectedSlideTimestamp.timestamp)
//add refference to firebase
// console.log(selSlide)
      
    }).catch(err => {
      dispatch({ type: 'CREATE_SELECTED_TIMESTAMP_ERROR' }, err);
    });
    

  }
};


export const timestampCounter = data => {
  return (dispatch) => { 
    dispatch({  type: 'TIMESTAMP_COUNTER', data : data });
  }
};


export const addCompanySlide = (slide) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('slides').add({
      ...slide,
      
      createdBy: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SLIDE_UPLOAD_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'SLIDE_UPLOAD_ERROR' }, err);
    });
  }
};



