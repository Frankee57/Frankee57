import React from 'react';
import '../css/loader.scss'
const  Loader=({message})=> {
    return (
        <div class="load">
          <div class="loader" >
          <div class="ltr"></div>
          <div class="ltr"></div>
          <div class="ltr"></div>
          <div class="ltr"></div>
          <div class="ltr"></div>
         <div class="ltr"></div>
          <div class="ltr"></div>
         <div class="ltr"></div>
         <div class="ltr"></div>
          <div class="ltr"></div>
        <div class="ltr"></div>
      </div>
      <div class="spinner-text ">{message}
      </div>
      </div>
    );
}

export default Loader;