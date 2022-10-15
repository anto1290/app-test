const express = require('express');
const router = express.Router();
const axios = require('axios')
/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    axios.get('http://localhost:3000/api/v1/report').then(
      async data => {
        const datadumy = data.data;
        let num = 0;
        let dom = [];
        const label = await axios.get('http://localhost:3000/api/v1/area').then(data => {
          let x = [];
          data.data.map(item => x.push(item.area_name));
          return x;
        });
        for (let i = 0; i < label.length; i++) {
          let numfilter = 0;
          datadumy.filter((a) => {
            if (a.area_name === label[i]) {
              numfilter += a.compliance;
            }
          });
          dom.push(numfilter)
        }
        dom.map(item => num += item);
        const sum = num / datadumy.length * 100;
        res.render('index', { title: 'Report Product', nilai: sum, labeli: label, datai: dom });

      }
    );
  } catch (error) {
    res.render('error')
  }
});
router.post('/', async function (req, res, next) {
  const { area = [], dateForm = '', dateEnd = '' } = req.body;
  try {
    axios.get('http://localhost:3000/api/v1/report', { area, startDate: dateForm, endDate: dateEnd }).then(
      async data => {
        const datadumy = data.data;
        let num = 0;
        let dom = [];
        const label = await axios.get('http://localhost:3000/api/v1/area').then(data => {
          let x = [];
          data.data.map(item => x.push(item.area_name));
          return x;
        });
        for (let i = 0; i < area.length; i++) {
          let numfilter = 0;
          datadumy.filter((a) => {
            if (a.area_name === area[i]) {
              numfilter += a.compliance;
            }
          });
          dom.push(numfilter)
        }
        dom.map(item => num += item);
        const sum = num / datadumy.length * 100;
        res.render('index', { title: 'Report Product', nilai: sum, labeli: label, datai: dom });

      }
    );
  } catch (error) {
    res.render('error')
  }
});
module.exports = router;
