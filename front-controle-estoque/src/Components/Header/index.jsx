import './Header.css';

const Header = () => {
    return (
        <header className='header'>
            <img src="../src/assets/logo-Photoroom.png" alt="" /> 
            <div>
            <img width="96" height="96" src="https://img.icons8.com/color/96/test-account.png" alt="test-account"/>
                <div>
                    <a href="">Sing-in</a>
                    <a href="">Sing-up</a>
                </div>                
            </div> 
      
        </header>
    );
}

export default Header;