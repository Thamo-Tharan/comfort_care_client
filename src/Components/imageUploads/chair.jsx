import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export function ChairUpload() {
  const [image, setImage] = useState(null);
  const [values, setvalues] = useState({
    name: "",
    price: "",
    offer: "",
    rating: "",
  });
  const onImageChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (O) => {
      setImage(reader.result); //base64encoded string
    };
    reader.onerror = (error) => {
      console.log("Enror: ", error);
    };
    console.log("Enror: ", reader.result);
  };
  const onsubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/comfort-and-care/uploadchair",
        {
          name: values.name,
          price: values.price,
          offer: values.offer,
          rating: values.rating,
          path: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      setvalues({
        name: "",
        price: "",
        offer: "",
        rating: "",
      });
      setImage("");
      toast.success("Sucess");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h4>Upload Chair</h4>
      <input type="file" onChange={onImageChange} className="filetype" />
      <input
        type="text"
        placeholder="name"
        value={values.name}
        onChange={(e) => {
          setvalues({ ...values, name: e.currentTarget.value });
        }}
      />
      <input
        type="text"
        placeholder="price"
        value={values.price}
        onChange={(e) => {
          setvalues({ ...values, price: e.currentTarget.value });
        }}
      />
      <input
        type="text"
        placeholder="offer"
        value={values.offer}
        onChange={(e) => {
          setvalues({ ...values, offer: e.currentTarget.value });
        }}
      />
      <input
        type="text"
        placeholder="rating"
        value={values.rating}
        onChange={(e) => {
          setvalues({ ...values, rating: e.currentTarget.value });
        }}
      />
      <button onClick={onsubmit}>submit</button>
      {image && <img src={image} alt="preview" />}
    </div>
  );
}
