// import React from "react";
// import "./Bestseller.css";
// import { FaArrowRight } from "react-icons/fa"; 

// const products = [
//   { id: "blush", name: "Prashad—Cooking with Indian Masters", img: "https://www.dropbox.com/scl/fi/qgivg5tj3p0zjlattqlad/01_Prashad-Cooking-with-Indian-Masters.jpg?rlkey=9f711wo7yk1a9i0n2vbkac6n8&st=fmt5tts8&raw=1" },
//   { id: "concealer", name: "Astadala Vol. 1 to 8", img: "https://www.dropbox.com/scl/fi/xx7tylx8cn0y3bggx152s/02_Astadala-Vol.-1-to-8.jpg?rlkey=kpiqlncf28elqbstiwsltyuwm&st=85n8qa4s&raw=1" },
//   { id: "eyeliner", name: "My Frozen Turbulence in Kashmir Book", img: "https://www.dropbox.com/scl/fi/lm68o0ldiprz3avgbk80y/03_My-Frozen-Turbulence-in-Kashmir-Book.jpg?rlkey=z4sd0g7dnj01n2wtbadbib5yc&st=tot5fkgq&raw=1" },
//   { id: "eyeshadow", name: "YOGA", img: "https://www.dropbox.com/scl/fi/r7daxiy1a9cti0n8ekdsw/04_Yoga.jpg?rlkey=lj4unjyz25dpnswbrzy9mbpuf&st=6m15r541&raw=1" },
//   { id: "foundation", name: "Indian History and Culture", img: "https://www.dropbox.com/scl/fi/jsrbb4zg9uly5j5u1qesv/05_Indian-History-and-Culture.jpg?rlkey=zxfhyna2h4ayjq6c5lkqdmbpt&st=67es8fu2&raw=1" },
//   { id: "lipbalm", name: "Regional Planning", img: "https://www.dropbox.com/scl/fi/5funn7mop0k68bqhzgok6/06_Regional-Planning.jpg?rlkey=tazq0y7xsxxquza2gvuyc8hme&st=vcmsg4ih&raw=1" },
//   { id: "lipbalm", name: "Advanced machining processes", img: "https://www.dropbox.com/scl/fi/k0s72lmir6lkn0s6u7af8/07_Advanced-machining-processes.jpg?rlkey=lckyj5i0m68ar0saukugotyhv&st=tn41im4t&raw=1" },
// ];

// const Bestsellers = () => {
//   return (
//     <div id="Bestsellers">
//       <h1>
//         {"BESTSELLERS".split("").map((char, index) => (
//           <span key={index}>{char}</span>
//         ))}
//       </h1>
//       <br />
//       <br />
//       <div id="images">
//         {products.map((product) => (
//           <div className="product" key={product.id} data-id={product.id}>
//             <img src={product.img} alt={product.name} />
//             <div className="content" data-id={product.id}>
//               <h5>{product.name}</h5>
//             </div>
//             <div>
//               </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Bestsellers;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Bestseller.css"; // CSS file
import { FaArrowRight } from "react-icons/fa";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Bestsellers = () => {
  const [products, setProducts] = useState([]);  // Bestseller books ka state

  useEffect(() => {
    axios.get("http://localhost:5001/api/home/bestsellers") // API call
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching bestsellers:", err));
  }, []);

  return (
    <div id="Bestsellers">
      <h1>
        {"BESTSELLERS".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </h1>
      <br />
      <br />
      <div id="images">
        {products.map((product) => (
          <div className="product" key={product._id} data-id={product._id}>
            <img src={product.image} alt={product.name} />
            <div className="content">
              <h5>{product.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
