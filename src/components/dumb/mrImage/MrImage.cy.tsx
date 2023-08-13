import MrImage from './MrImage'

describe('<Image />', () => {

    it('render show default value', () => {
        cy.mount(<MrImage/>)
        cy.getByData('image').find('img').should('have.attr', 'src', '/images/no_photo_available.jpeg')
            .and('have.attr', 'alt', 'image')
            .and('have.attr', 'width', 210)
            .and('have.attr', 'height', 140)
    })

    it('render image', () => {
        let multimedia ={
            src: "https://static01.nyt.com/images/2023/04/05/multimedia/05super-mario-bros-movie-hfvl/05super-mario-bros-movie-hfvl-mediumThreeByTwo440.jpg",
            height: 140,
            width: 210
          }
        cy.mount(<MrImage src={multimedia.src} width={multimedia.width} height={multimedia.height} />)
        cy.getByData('image').find('img').should('have.attr', 'src', multimedia.src)
        .and('have.attr', 'alt', 'image')
        .and('have.attr', 'width', multimedia.width)
        .and('have.attr', 'height', multimedia.height)
    })
})