import dedent from 'dedent';

export function getTestInput1() {
    return dedent`
{
    {_anchors-and-phrases
        &
        &_
        &_placeholder
       
        --
        
        anchor
        anchor-with-dashes
        
        --
        
        phrases are composed of multiple words
        phrases are composed of multiple anchors[ sometimes having an essence ]
        
        --
        
        {_examples
            & => &
            & => &_
            & => cat
            & => boiled eggs are hard
            & => &_eggs
        }
    }
    {_essence
        anchor[
            concept
            
            --
            
            #_status
            
            --
            
            objective => subjective
            objective => intermediate => subjective
        ]
    }
    {_description
        anchor.{
            test
        }
    }
    {_channels
        #
        #_channel
        #_channel_2 => strand
    }
}
`;
}