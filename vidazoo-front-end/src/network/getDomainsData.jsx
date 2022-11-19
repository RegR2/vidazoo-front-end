import axios from "axios";

export default async function sendAdsFile() {
  const url = "http://localhost:5500/domains/getDomains";

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log("err", JSON.stringify(err.response, null, 2));
  }
}
