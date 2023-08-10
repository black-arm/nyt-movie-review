import { Reviewer } from "@/model"
import Modal from './Modal'

describe('<Modal />', () => {
    let reviewer: Reviewer;
    beforeEach(() =>{
        cy.viewport(1280, 780)
        reviewer = {
            display_name: "A. O. Scott",
            sort_name: "A. O. Scott",
            status: "full-time",
            bio: "A. O. Scott joined The New York Times as a film critic in January 2000, and was named a chief critic in 2004. Previously, Mr. Scott had been the lead Sunday book reviewer for Newsday and a frequent contributor to Slate, The New York Review of Books, and many other publications. \n<br/><br/>\nIn the 1990s he served on the editorial staffs of Lingua Franca and The New York Review of Books. He also edited \"A Bolt from the Blue and Other Essays,\" a collection by Mary McCarthy, which was published by The New York Review of Books in 2002. \n<br/><br/>\nMr. Scott was a finalist for the Pulitzer Prize in Criticism in 2010, the same year he served as co-host (with Michael Phillips of the Chicago Tribune) on the last season of \"At the Movies,\" the syndicated film-reviewing program started by Roger Ebert and Gene Siskel.\n<br/><br/>\nA frequent presence on radio and television, Mr. Scott is Distinguished Professor of Film Criticism at Wesleyan University and the author of Better Living Through Criticism, forthcoming in 2016 from The Penguin Press. A collection of his film writing will be published by Penguin in 2017. \n<br/><br/>\nHe lives in Brooklyn with his family.",
            seo_name: "A-O-Scott",
            multimedia: {
              resource: {
                type: "image",
                src: "http://static01.nyt.com/images/2015/10/07/topics/ao-scott/ao-scott-articleInline.jpg",
                height: 163,
                width: 220,
                credit: "Earl Wilson/<br/>The New York Times"
              }
            }
          }
        
        cy.mount(<Modal isOpen={true} reviewer={reviewer}/>)
    })

    it('style requirements', () => {
        cy.getByData('modalReviewer')
        .should(($div) => {
            const className = $div[0].className;
            expect(className).to.match(/modalOverlay/)
        })
        cy.getByData('modalReviewer').find('div').should('have.attr', 'class')
            .and('match', /modal/)
        cy.getByData('modalReviewer').find('button').should('have.attr', 'class')
            .and('match', /modalCloseButton/)
        
      });

      it('should be call closeModal', () => {
        const closeModal = cy.spy().as('closeModal')
        cy.mount(<Modal isOpen={true} closeModal={closeModal}/>)
        
        cy.getByData('modalButton').click()
        cy.get('@closeModal').should('have.been.called')
      })

      it('should be view reviewer info', () =>{

       cy.getByData('name').contains(reviewer?.display_name ? reviewer.display_name: '')
        cy.getByData('image').find('img').should('have.attr', 'src', reviewer?.multimedia?.resource?.src ? reviewer.multimedia.resource.src : '')
          .should('have.attr', 'width', reviewer?.multimedia?.resource?.width ? reviewer.multimedia.resource.width : '')
          .should('have.attr', 'height', reviewer?.multimedia?.resource?.height ? reviewer.multimedia.resource.height : '')
        cy.getByData('bio').should('exist')
      })

      it('should view image not available', () => {
        
        reviewer.multimedia = undefined
        cy.mount(<Modal isOpen={true} reviewer={reviewer} />)
        cy.getByData('image').find('img').should('have.attr', 'src', '/images/no_photo_available.jpeg')
        
      })
})