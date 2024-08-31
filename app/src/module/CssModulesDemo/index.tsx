import React from 'react'
import Split from '@uiw/react-split';
import { Flex, TweakableElementWrapper } from 'reflexy';
import css from './index.css'

export interface Classes {
    base: string;
    afterOpen: string;
    beforeClose: string;
}

interface MYYProps {
    aa?: string | undefined;
    myy?: boolean | undefined;
    gg?: boolean | undefined;
    className?: string | Classes | undefined;
    // className?: Classes;
    // className?: string;
    // className?: string | number | undefined;
    // style?: number;
    style?:
        | { content?: { [P: string]: any } | undefined; overlay?: { [P: string]: any } | undefined }
        | undefined;
    // style?: { [P: string]: any };
}

function MYY({ aa, myy, gg }: React.PropsWithChildren<MYYProps>) {
    return <div data-myy={aa || myy || gg} >sfsafsdfs fsd fsa </div>;
}

export default function CssMododulesDemo() {

    // console.log('css moduel dmeo....', css)

    function onAbort(event: React.SyntheticEvent<HTMLDivElement>) {
        event;
    }

    return (
    <div>
        <div>aaaaa</div>
        {/*<Flex ml pb>
            hello world
        </Flex>*/}
        {/*<Flex row justifyContent="center">
            <div>
                hello
            </div>
            <span>
                yiduanwenzihenhao de
            </span>
        </Flex>*/}
        {/*<Flex row component={<button type="reset"></button>}  p />*/}
        {/*<Flex key="1" p >abc</Flex>*/}
      {/*<Flex row hfill style={{ height: '40%' }}>
        <div className={css.box}>
          hello
        </div>
      </Flex>*/}
      {/*<Flex row hfill style={{ height: '40%' }}>
        <div>
          tablexxxxxxxxxxxxxxx
        </div>
      </Flex>*/}
        {/*<Split style={{ height: 100, border: '1px solid #d5d5d5', borderRadius: 3 }}>
            <div style={{ width: '20%', minWidth: 30 }}>
                <iframe
                    srcDoc="<div>test</div>"
                    style={{ width: '100%', height: '100%' }}
                    title="Code Preview"
                    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                />
            </div>
            <div style={{ width: '80%', minWidth: 100 }}>Right Pane</div>
        </Split>
        <Split style={{ height: 100, border: '1px solid #d5d5d5', borderRadius: 3 }}>
            <div style={{ minWidth: 60 }}>test</div>
            <div style={{ minWidth: 80, flex: 1 }}>Right Pane</div>
        </Split>*/}

    </div>
  )
}

