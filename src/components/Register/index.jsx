import {useRegisterStore} from '../../stores/registerStore';

export default function Register() {
  const { formData, onUpdateFormData } = useRegisterStore(); 
  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    console.log('表单提交');
  };
  return (
    <div>
      <h1>用户注册</h1>      
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="username">用户名</label>
            <input type="text" id="username" placeholder="请输入用户名" required value={formData.username}
              onChange={function(e) { onUpdateFormData('username', e.target.value); }}
            />
          </li>
          <li>
            <label htmlFor="password">密码</label>
            <input type="password" id="password" placeholder="请输入密码" required value={formData.password}
              onChange={function(e) { onUpdateFormData('password', e.target.value); }}
            />
          </li>
          <li>
            <label htmlFor="phone">手机号</label>
            <input type="text" id="phone" placeholder="请输入手机号" value={formData.phone}
              onChange={function(e) { onUpdateFormData('phone', e.target.value); }}
            />
          </li>
          <li>
            <label htmlFor="verificationCode">验证码</label>
            <input type="text" id="verificationCode" placeholder="请输入验证码" value={formData.verificationCode}
              onChange={function(e) { onUpdateFormData('verificationCode', e.target.value); }}
            />
          </li>
        </ul>
        <button type="submit">注册</button>
      </form>
    </div>
  );
}