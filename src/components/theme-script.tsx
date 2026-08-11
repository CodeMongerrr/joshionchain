/**
 * Runs before first paint, so the correct theme is on <html> by the time
 * anything renders. Without this the page flashes light before hydration.
 *
 * Also sets `data-js`, which is what arms the scroll-reveal base state, with
 * JS disabled the attribute never appears and content is simply visible.
 */
const script = `(function(){try{
var t=null;try{t=localStorage.getItem('aj-theme')}catch(e){}
if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
var d=document.documentElement;
d.setAttribute('data-theme',t);
if(document.visibilityState==='visible'){d.setAttribute('data-js','')}
}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
