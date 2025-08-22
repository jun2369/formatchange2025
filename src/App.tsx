import { useState } from 'react';

function App() {
  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [output3, setOutput3] = useState('');
  const [output4, setOutput4] = useState('');

  const handleConvert1 = () => {
    const input = (document.getElementById('input1') as HTMLTextAreaElement).value;
    const lines = input.split('\n').filter(line => line.trim());
    const result = lines.join(', ');
    setOutput1(result);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // 可以添加一个提示，但这里保持简单
    });
  };

  const handleReset = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLTextAreaElement;
    if (input) {
      input.value = '';
    }
    // 清空对应的输出
    if (inputId === 'input1') setOutput1('');
    if (inputId === 'input2') setOutput2('');
    if (inputId === 'input3') setOutput3('');
    if (inputId === 'input4') setOutput4('');
  };

  const handleConvert2 = () => {
    const input = (document.getElementById('input2') as HTMLTextAreaElement).value;
    const lines = input.split('\n').filter(line => line.trim());
    const result = lines.map(line => `'${line}'`).join(', ');
    setOutput2(result);
  };

  const handleConvert3 = () => {
    const input = (document.getElementById('input3') as HTMLTextAreaElement).value;
    const lines = input.split('\n').filter(line => line.trim());
    const result = lines.map(line => `"${line}"`).join(', ');
    setOutput3(result);
  };

  const handleConvert4 = () => {
    const input = (document.getElementById('input4') as HTMLTextAreaElement).value;
    const lines = input.split('\n').filter(line => line.trim());
    const results = lines.map(line => {
      try {
        const trimmedLine = line.trim();
        let date: Date;
        
        if (trimmedLine.includes('/')) {
          const parts = trimmedLine.replace(',', '').split(' ');
          const datePart = parts[0];
          const timePart = parts[1] || '00:00';
          
          const [month, day, year] = datePart.split('/');
          const fullYear = year.length === 2 ? '20' + year : year;
          
          date = new Date(`${fullYear}-${month}-${day} ${timePart}`);
        } else {
          date = new Date(trimmedLine);
        }
        
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        } else {
          return `无效的日期格式: ${line}`;
        }
      } catch (error) {
        return `转换失败: ${line}`;
      }
    });
    
    setOutput4(results.join('\n'));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f0f2f5', display: 'flex', minWidth: '210vh',}}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px',marginRight:'42px',}}>格式转换工具</h1>
      
      {/* 工具1: 逗号分隔 */}
      <div style={{ background: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#4CAF50', marginBottom: '15px' }}>1, 2, 3</h2>
        <textarea 
          id="input1"
          style={{ width: '100%', height: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace', boxSizing: 'border-box' }}
          placeholder="输入内容，每行一个"
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            style={{ flex: 1, padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={handleConvert1}
          >
            转换
          </button>
          <button 
            style={{ padding: '10px 20px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={() => handleReset('input1')}
          >
            RESET
          </button>
        </div>
        {output1 && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            <strong>结果：</strong>{output1}
            <button 
              style={{ marginLeft: '10px', padding: '5px 10px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => handleCopy(output1)}
            >
              复制
            </button>
          </div>
        )}
      </div>

      {/* 工具2: 单引号 */}
      <div style={{ background: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#2196F3', marginBottom: '15px' }}>'1', '2', '3'</h2>
        <textarea 
          id="input2"
          style={{ width: '100%', height: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace', boxSizing: 'border-box' }}
          placeholder="输入内容，每行一个"
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            style={{ flex: 1, padding: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={handleConvert2}
          >
            转换
          </button>
          <button 
            style={{ padding: '10px 20px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={() => handleReset('input2')}
          >
            RESET
          </button>
        </div>
        {output2 && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            <strong>结果：</strong>{output2}
            <button 
              style={{ marginLeft: '10px', padding: '5px 10px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => handleCopy(output2)}
            >
              复制
            </button>
          </div>
        )}
      </div>

      {/* 工具3: 双引号 */}
      <div style={{ background: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#9C27B0', marginBottom: '15px' }}>"1", "2", "3"</h2>
        <textarea 
          id="input3"
          style={{ width: '100%', height: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace', boxSizing: 'border-box' }}
          placeholder="输入内容，每行一个"
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            style={{ flex: 1, padding: '10px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={handleConvert3}
          >
            转换
          </button>
          <button 
            style={{ padding: '10px 20px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={() => handleReset('input3')}
          >
            RESET
          </button>
        </div>
        {output3 && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            <strong>结果：</strong>{output3}
            <button 
              style={{ marginLeft: '10px', padding: '5px 10px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => handleCopy(output3)}
            >
              复制
            </button>
          </div>
        )}
      </div>

      {/* 工具4: 日期时间格式化 */}
      <div style={{ background: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#FF9800', marginBottom: '15px' }}>yyyy-mm-dd hh:mm:ss</h2>
        <textarea 
          id="input4"
          style={{ width: '100%', height: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace', boxSizing: 'border-box' }}
          placeholder="输入时间，每行一个，如：&#10;07/01/25 11:00&#10;08/09/25 14:02"
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            style={{ flex: 1, padding: '10px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={handleConvert4}
          >
            转换
          </button>
          <button 
            style={{ padding: '10px 20px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
            onClick={() => handleReset('input4')}
          >
            RESET
          </button>
        </div>
        {output4 && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            <strong>结果：</strong><br />{output4}
            <button 
              style={{ marginTop: '10px', padding: '5px 10px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => handleCopy(output4)}
            >
              复制
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;