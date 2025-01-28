import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PhotosContext = createContext();

export const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageUrls = [
    'https://images.wallpaperscraft.com/image/single/lake_mountain_tree_36589_2650x1600.jpg',
    'https://avatars.mds.yandex.net/i?id=6c2bda59576dd941127efb12a0072a57_l-9107081-images-thumbs&n=13',
    'https://i.pinimg.com/originals/ba/bd/6d/babd6d37eb2dd965c7f1dfb516d54094.jpg',
    'https://www.zastavki.com/pictures/originals/2014/Nature___Seasons___Spring_Cold_river_in_spring_067776_.jpg',
    'https://images.hdqwalls.com/download/mountain-reflections-3840x2400.jpg',
    'https://ae01.alicdn.com/kf/HTB1psxNgHGYBuNjy0Foq6AiBFXaC/Laeacco-Mountain-River-Trees-Waterfall-Scenic-Photography-Backgrounds-Customized-Photographic-Backdrops-For-Photo-Studio.jpg',
    'https://images.wallpaperscraft.com/image/single/cat_face_eyes_29447_1280x720.jpg',
    'https://get.wallhere.com/photo/sunlight-landscape-forest-mountains-waterfall-water-nature-reflection-sky-park-clouds-river-Sun-national-park-wilderness-stream-mountain-body-of-water-water-feature-248984.jpg',
    'https://i.pinimg.com/originals/bc/50/3d/bc503da308b41105cc038b62e3f47083.jpg',
    'https://avatars.mds.yandex.net/i?id=676689d726716c81200a03e48744fb42_l-4559382-images-thumbs&n=13',
    'https://i.pinimg.com/originals/33/d0/2c/33d02c67b4a6e90abe2d7a58f764edd8.jpg',
    'https://i.pinimg.com/originals/93/a7/51/93a7515954c7b8751d5467d43327cc89.jpg',
    'https://i.pinimg.com/originals/65/ed/fd/65edfdb2f3aea4de0f62072678ebb232.jpg',
    'https://i.pinimg.com/originals/74/5b/69/745b69c8205373684c9bc72a42bdde6d.jpg',
    'https://i.ytimg.com/vi/3qdqTR8bJLk/maxresdefault.jpg',
    'https://get.wallhere.com/photo/Trey-Ratcliff-photography-cityscape-France-Paris-Eiffel-Tower-2196341.jpg',
    'https://www.zastavki.com/pictures/originals/2017Nature_Beautiful_clouds_reflected_in_the_blue_water_of_the_ocean_115872_.jpg',
    'https://static.tildacdn.com/tild6631-6331-4336-a332-656538626663/2.jpg',
    'https://i.pinimg.com/originals/36/76/99/36769945f37cb48d1cc24ba4dc724d94.jpg',
    'https://wallpapers.com/images/hd/3d-waterfall-1920-x-1280-wallpaper-h3mefn9cnkbhgzb8.jpg',
    'https://i.pinimg.com/originals/5d/e2/42/5de24294bad21ec99931f4c362354f22.jpg'
  ];

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=20')
      .then(response => {
        console.log('Fetched photos:', response.data);
        const updatedPhotos = response.data.map((photo, index) => ({
          ...photo,
          url: imageUrls[index]
        }));
        setPhotos(updatedPhotos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setError('Не удалось загрузить фотографии. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  }, []);

  return (
    <PhotosContext.Provider value={{ photos, setPhotos, error, loading }}>
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotos = () => {
  return useContext(PhotosContext);
};
