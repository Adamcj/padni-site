document.querySelectorAll('.phone-showcase').forEach(showcase=>{
 showcase.querySelectorAll('[data-phone]').forEach(button=>button.addEventListener('click',()=>{
  showcase.querySelectorAll('[data-phone]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  showcase.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==button.dataset.phone);
 }));
});
