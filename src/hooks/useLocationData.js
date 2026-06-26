import { useState, useEffect } from 'react';

export function useLocationData() {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch('/divisions.json')
      .then(res => res.json())
      .then(data => {
        const divData = data.find(item => item.type === 'table' && item.name === 'divisions');
        if (divData) setDivisions(divData.data);
      })
      .catch(err => console.error("Error loading divisions:", err));

    fetch('/districts.json')
      .then(res => res.json())
      .then(data => {
        const distData = data.find(item => item.type === 'table' && item.name === 'districts');
        if (distData) setDistricts(distData.data);
      })
      .catch(err => console.error("Error loading districts:", err));

    fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => {
        const upaData = data.find(item => item.type === 'table' && item.name === 'upazilas');
        if (upaData) setUpazilas(upaData.data);
      })
      .catch(err => console.error("Error loading upazilas:", err));
  }, []);

  return { divisions, districts, upazilas };
}
