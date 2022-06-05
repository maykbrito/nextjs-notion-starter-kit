import * as React from 'react'

export function Slide() {
  const [slides, setSlides] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {

    // essa função é memorizada por estar dentro do useEffect
    function escFunction(event: KeyboardEvent){
      if (event.key === "Escape") {
        console.log('escape')

        const articleItems = document.querySelectorAll('.notion-page-content-inner > *')

        const slidesItems = [...articleItems].reduce((acc, item) => {

          if([...item.classList].includes('notion-hr')) {
              const slide = {
                  id: item,
                  content: []
              }
              acc.push(slide)
          }
      
          if(acc.at(-1) !== undefined && !item.classList.contains('notion-hr')) {
            acc.at(-1).content.push(item)
          }
          
          return acc
        }, [])

        if(slidesItems.length < 1) return;
        
        setSlides(slidesItems)
        setIsOpen(prevState => !prevState)
        
      }

      // when click left arrow  
      if (event.key === "ArrowLeft") {
        if(!isOpen) return;
        window.scrollTo(0, window.scrollY - window.innerHeight)
      }

      // when click right arrow
      if (event.key === "ArrowRight") {
        if(!isOpen) return;
        window.scrollTo(0, window.scrollY + window.innerHeight)
      }
    }
    
    window.addEventListener('keydown', escFunction, false)

    // no ciclo de vida, essa etapa será antes de desmontar o componente
    return () => window.removeEventListener('keydown', escFunction)
  }, [slides, isOpen])


  const getContent = (slide)  => slide.content.reduce((acc, ObjectHTMLElement) => acc + ObjectHTMLElement.outerHTML, '')

  return ( 
    <div className={`slides ${isOpen ? 'active' : ''}`}>
      {slides.map((slide, key) => 
        <section key={key}>
          <div className="content" dangerouslySetInnerHTML={{ __html: getContent(slide), }}>
          </div>
        </section>)}
    </div>
  )
}