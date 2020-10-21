import React, { useEffect, useState } from 'react';
import MapMarkerImg from '../images/map-marker.svg'
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import '../styles/pages/orphanages-map.css';
import Leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import api from '../services/api';


const mapIcon = Leaflet.icon({
    iconUrl: MapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
})

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}
function OrphanagesMap (){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
   
    useEffect(() =>{
      api.get('orphanages').then(response =>{
       setOrphanages(response.data);

      });
    }, [])
    return(
    <div id="page-map">
        <aside>
            <header>
                <img src={MapMarkerImg} alt="Happy"/>
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>Criciúma</strong>
                <span>Santa Catarina</span>
            </footer>
        </aside>
        <Map
        center={[-28.7148718,-49.3802808]}
        zoom={15}
        style={{width: '100%', height: '100%'}}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer 
        url= {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

         {orphanages.map(orphanage => {
             return(
                <Marker
                position={[orphanage.latitude, orphanage.longitude]}
                icon={mapIcon}
                key={orphanage.id}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className= "map-popup">
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                          <FiArrowRight size={20} color={'#fff'}/>
                        </Link>
                    </Popup>
                </Marker>
             )
         })}
        
         </Map>
           
        
         <Link to="orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#fff"></FiPlus>
         </Link>
    </div>
    );
}
export default OrphanagesMap;