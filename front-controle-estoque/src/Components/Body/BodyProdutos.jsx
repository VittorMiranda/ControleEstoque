import FormProduto from '../Forms/FormsProduto';
import './Body.css';

const BodyProdutos = () => {
    return(
        <main className='corpo'>
            <div className='principal'>
                <FormProduto></FormProduto>
            </div>
        </main>
    );
}

export default BodyProdutos;