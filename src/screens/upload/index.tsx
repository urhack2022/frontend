import react from 'react'
import {Upload} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import axios from 'axios'
import {Typography} from 'antd'
import './style.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Collapse } from 'antd';
const { Panel } = Collapse;



ChartJS.register(ArcElement, Tooltip, Legend);


export const MyUpload: react.FC = () => {

    const [file, setFile] = react.useState("")
    const [predictClass, setPredictClass] = react.useState("")
    const [sumText, setSumText] = react.useState("")
    const [chart_values, setCharValues] = react.useState([])

    const data = {
        labels: ['Договоры поставки', 'Договоры оказания услуг', 'Договоры подряда', 'Договоры аренды', 'Договоры купли продажи'],
        datasets: [
          {
            label: '# Количество предложений',
            data: chart_values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    
    return <div className='centered'>
        <Upload.Dragger style={{width: 1000}} customRequest={async (e) => {
            const fd = new FormData()
            fd.append('file', e.file)
            const data = await axios.post('http://127.0.0.1:8000/file_upload', fd, {headers: {"Content-Type": "multipart/form-data"}})
            setPredictClass(data.data.predict_class)
            setSumText(data.data.sum_text)
            setFile(data.data.file)

            var char_array = [0, 0, 0, 0, 0]

            data.data.nodes.map((e: any) => {
                char_array[parseInt(e.predict_class)]++
            })

            setCharValues(char_array as any)

            e.onSuccess!("OK")
        }}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Upload.Dragger>
        {
            predictClass.length ? <Typography.Title level={3}>{predictClass}</Typography.Title>: <></>
        }
        {
            sumText.length ? <Typography style={{width: 1000}}>{sumText}</Typography>: <></>
        }
        <Collapse style={{width: 1000}}>
            <Panel header="Показать график классификации предложений" key='1'>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                    chart_values.length ?
                    <div style={{width: 400, height: 400}}>
                        <Pie data={data} style={{width: 300, height: 300}}/>
                    </div> : <></>
                }
                </div>
            </Panel>
            <Panel header="Показать сегментацию ключевых моментов в файле" key='2'>
                <div className="inputs">
                    {
                        file.length ? <iframe src={file} width={970} height={700}></iframe>: <></>
                    }
                </div>
            </Panel>
        </Collapse>

    </div>
}