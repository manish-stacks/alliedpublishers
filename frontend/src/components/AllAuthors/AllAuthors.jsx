import React from 'react';
import './AllAuthor.css';
import { useNavigate } from 'react-router-dom';

const authors = [
  {
    name: 'Jiggs Kalra',
    image: 'https://www.dropbox.com/scl/fi/vd5fbg7kstj61u66x1i7o/image1.jpg?rlkey=66yvj9jgm1tm5xuuqboy6tkza&st=e1pybm59&raw=1',
    description: 'Pioneer food columnist and culinary TV anchor, gastronome and food consultant, Jiggs Kalra has been consultant to various national and international hotels and hotel chains. He has conducted memorable Festival of India frequently both in India and abroad and is considered an Ambassador of Indian cuisine worldwide. Jiggs has been inducted into the International Foods and Beverage Forum Hall of Fame...',
    notableWorks: ['Prashad: Cooking with Indian Masters', 'Daawat','Kama Bhog: Foods of Love','Classic Cooking of Avadh', 'Classic Cooking of Punjab','Classic Cooking of Rajasthan with a Special Section on Cuisine of Kotah','100 Best of Jiggs Kalra: Zaike ka Safar'],
  },
  {
    name: 'Shri Jagmohan',
    image: 'https://www.dropbox.com/scl/fi/dss9l8pvaa4r9aei870vk/image3.jpg?rlkey=3hl0d5do7u2o78kxi2e5zt2nl&st=wemz7321&raw=1',
    description: 'Shri Jagmohan is a truly many-splendoured personality. He has been an outstanding civil servant, Parliamentarian, Union Minister and original thinker and writer. Throughout his long and illustrious years in public service, he has worked with an unmatched passion, for creating a model of fair, just and effective governance....',
    notableWorks: ['My Frozen Turbulence in Kashmir', 'Shaping India’s New Destiny', 'Triumphs and Tragedies of Ninth Delhi (English, Hindi)','Bharat ki Nayi Niyathi ka Akritikaran','Crisis of Environment and Climate Change'],
  },
  {
    name: 'B.K.S. Iyengar',
    image: 'https://www.dropbox.com/scl/fi/6ftgn2gq5vogaa94k86i6/image2.jpg?rlkey=qvuf2y7zm4v6zumliz9zcegi9&st=xujn6s4f&raw=1',
    description: 'B.K.S. Iyengar was born in India in 1918 and started teaching yoga at the age of 17. He was one of the world’s leading teachers of yoga for over 70 years and was internationally recognized as a leading authority of hatha yoga. His own style of teaching, Iyengar Yoga, is followed by certified teachers across the world. Iyengar was the first person to teach yoga to large groups of students...',
    notableWorks: ['Astadala Yogamala: The Collected Works of B.K.S. Iyengar (Vols. 1 to 8)'],
  },
  {
    name: 'Geeta Iyengar',
    image: 'https://www.dropbox.com/scl/fi/z6zlgyt24rka2hrpwrei0/image4.jpg?rlkey=vx3o671h0eethroiublsbwui3&st=n8bs8omy&raw=1',
    description: 'Geeta Iyengar has inherited the gift of Yoga from her distinguished father Shri B.K.S. Iyengar, who is a Yoga exponent of world repute, known for his vast knowledge of the subject and his performing skills.She had been teaching Yoga since 1962 in Pune. A graduate in Philosophy and Vaidya Visharad, her knowledge of Ayurveda blended with her knowledge of Yoga, makes her an expert guide for students. She is one of the partners of the Ramamani Iyengar Memorial Yoga Institute.',
    notableWorks: ['Yoga: A Gem for Women'],
  }
];

const AllAuthors = () => {
    const navigate = useNavigate();
  
    const handleBackToHome = () => {
      navigate('/'); // Navigate back to the home screen
    };
  return (
    <div className="all-authors-page">
      <div className="back-to-home-container">
        <button onClick={handleBackToHome} className="back-to-home-button">
          ← Back to Home
        </button>
      </div>
      <h1>All Featured Authors</h1>
      
      <div className="all-authors-container">
        {authors.map((author, index) => (
          <div key={index} className="author-card">
            <img
              src={author.image}
              alt={author.name}
              className="author-card-image"
            />
            <div className="author-card-info">
              <h2 className="author-card-name">{author.name}</h2>
              <p className="author-card-description">{author.description}</p>
              <div className="author-card-notable-works">
                <h3>Notable Works:</h3>
                <ul>
                  {author.notableWorks.map((work, idx) => (
                    <li key={idx}>{work}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAuthors;
