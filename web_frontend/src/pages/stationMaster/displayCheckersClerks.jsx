import React , { useState } from "react";
/*import Logo from '../common/logoText.png';*/
import '../../css/stationmaster.css';
import checkerClerkCard from './checkerClerkCard';

const displayCheckersClerks = () => {
    return (
        <div>
            <div className="tabs">
                <button className="tab-button" onclick="showTab(1)">Clerks</button>
                <button className="tab-button" onclick="showTab(2)">Checkers</button>
            </div>
    
            <div className="card" id="tab1">
            <checkerClerkCard Name="Name1"/>
            <checkerClerkCard Name="Name2"/>
            </div>
            
            <div className="card" id="tab2">
            <checkerClerkCard Name="Name1"/>
            <checkerClerkCard Name="Name2"/>
            </div>
            
            {/*<script>
            function showTab(tabIndex) {
                const tabContents = document.querySelectorAll('.tab-content');
                
                for (const tabContent of tabContents) {
                    tabContent.classList.remove('active');
                }
                
                const selectedTab = document.getElementById('tab' + tabIndex);
                selectedTab.classList.add('active');
            }
            </script>*/}
               
        </div>
        
    );
};

export default displayCheckersClerks;