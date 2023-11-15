import {Link} from "react-router-dom";

export const CTA = () => {
    return (
        <section className='cta'>
            <p className='cta-text'>
             Need a good developer? <br className='sm:block hidden' />
                Let’s build something together!
            </p>
            <Link to='/contact' className='btn'>
                Contact
            </Link>
        </section>
    );
};