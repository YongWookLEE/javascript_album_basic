const API_URL = "https://animal-api-two.vercel.app/";

const request = async (kind) => {
  let cur_url = kind ? API_URL + kind : API_URL;
  let res = await fetch(cur_url);
  let template = [];

  try {
    if (res) {
      let data = await res.json();
      return data.photo;
    }
  } catch (err) {
    console.log(err);
  }
};

export { request };
