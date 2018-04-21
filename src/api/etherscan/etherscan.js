import axios from 'axios';

export const getWallet = address =>
  getResult(address)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return {
        status: false,
        result: error.toString(),
      };
    });

const getResult = address =>
  axios.get('https://api.etherscan.io/api', {
    params: {
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apikey: 'YourApiKeyToken',
    },
  });
