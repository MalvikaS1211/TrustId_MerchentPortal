import { EVENT_TYPES } from "./servicesTypes";

class TrustId {
  constructor(target = "trustid@hnpakgifhianijcabdkhflifcinndeai") {
    this.target = target;
  }

  connect = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log("called calltrustid");
        window.postMessage(
          {
            type: EVENT_TYPES.REQUEST_KYC_CONNECTION,
            target: this.target,
          },
          "*"
        );

        this.getResponse([EVENT_TYPES.RESPONSE_KYC_CONNECTION])
          .then(resolve)
          .catch(reject);
      } catch (e) {
        console.error(e, "error in calltrustid");
        reject(e);
      }
    });
  };

  getKYCData = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log("called getKYCDataFromTrustId");
        window.postMessage(
          {
            type: EVENT_TYPES.KYC_APPROVAL_REQUEST,
            target: this.target,
          },
          "*"
        );

        this.getResponse([EVENT_TYPES.KYC_APPROVAL_RESPONSE])
          .then(resolve)
          .catch(reject);
      } catch (e) {
        console.error(e, "error in getKYCDataFromTrustId");
        reject(e);
      }
    });
  };

  getAccessToken = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log("called getAccessToken");
        window.postMessage(
          {
            type: EVENT_TYPES.ACCESS_LOGIN_TOKEN,
            target: this.target,
          },
          "*"
        );

        this.getResponse([EVENT_TYPES.LOGIN_TOKEN]).then(resolve).catch(reject);
      } catch (e) {
        console.error(e, "error in getAccessToken");
        reject(e);
      }
    });
  };

  getResponse = (expectedTypes) => {
    return new Promise((resolve, reject) => {
      const handler = (event) => {
        if (expectedTypes.includes(event.data.type)) {
          window.removeEventListener("message", handler); // Cleanup
          resolve(event.data);
        }
      };

      window.addEventListener("message", handler);

      setTimeout(() => {
        window.removeEventListener("message", handler);
        // reject(new Error("Timeout waiting for response from TrustId"));
      }, 10000);
    });
  };
}

export default TrustId;
