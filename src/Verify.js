"use strict";

import nexmo from './index';

class Verify {
  
  /**
   * @param {Credentials} credentials
   *    credentials to be used when interacting with the API.
   * @param {Object} options
   *    Addition Verify options.
   */
  constructor(credentials, options = {}) {
    this.creds = credentials;
    this.options = options;
    
    // Used to facilitate testing of the call to the underlying object
    this._nexmo = this.options.nexmoOverride || nexmo;
    
    this._nexmo.initialize(this.creds.key, this.creds.secret, this.options.debug);
  }
  
  /**
   * TODO: document
   */
  verifyNumber() {
    this._nexmo.verifyNumber.apply(this._nexmo, arguments);
  }
  
  /**
   * TODO: document
   */
  checkVerifyRequest() {
    this._nexmo.checkVerifyRequest.apply(this._nexmo, arguments);
  }
  
  /**
   * TODO: document
   */
  controlVerifyRequest() {
    this._nexmo.controlVerifyRequest.apply(this._nexmo, arguments);
  }
  
  /**
   * TODO: document
   */
  searchVerifyRequest() {
    this._nexmo.searchVerifyRequest.apply(this._nexmo, arguments);
  }
  
}

export default Verify;
