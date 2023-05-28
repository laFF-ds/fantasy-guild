const template = document.createElement("template")
template.innerHTML = `
    <style>
        *
        {
            box-sizing: border-box;
        }
        slot
        {
            
            margin:0;
            font-size: 1.2rem;
            font-weight: bold;
        }

        ::slotted(h1)
        {
            margin:0;
        }

        .quest
        {
            background-image: url("stained-paper.jpg");
            background-size: contain;
            margin: 0;
            height: 100%;
            text-align: center;
            padding: .629rem;
        }
        
    </style>
    <div class="quest uwu">
        <slot id="quest-details"></slot>
    </div>
    
`
class QuestItem extends HTMLElement
{
    constructor()
    {
        super()
        const shadow = this.attachShadow({mode:"open"})
        shadow.append(template.content.cloneNode(true))
    }
}

customElements.define("quest-item", QuestItem)