import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { searchRequest } from '../actions';
import '../assets/styles/components/Search.scss';

const Search = (props) => {
  const { searchResult, isHome } = props;
  const inputStyle = classNames('input', { isHome });

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      props.searchRequest(event.target.value);
    }
  };

  return (
    <section className='main'>
      <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
      <input
        name='search'
        className={inputStyle}
        type='text'
        placeholder='Buscar...'
        onKeyUp={handleEnter}
      />

      {searchResult.length > 0 && (
        <Categories title='Resultados'>
          <Carrousel>
            {searchResult.map((item) => (
              <CarrouselItem
                key={item.id}
                {...item}
              />
            ))}
          </Carrousel>
        </Categories>
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResult: state.searchResult,
  };
};

const mapDispatchToProps = {
  searchRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);