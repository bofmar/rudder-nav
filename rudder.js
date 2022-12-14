function siblings(elem) {
  // create an empty array
  const siblings = [];

  // if no parent, return empty list
  if (!elem.parentNode) {
    return siblings;
  }

  // first child of the parent node
  let sibling = elem.parentNode.firstElementChild;

  // loop through next siblings until `null`
  do {
    // push sibling to array
    if (sibling !== elem) {
      siblings.push(sibling);
    }
  } while (sibling = sibling.nextElementSibling);

  return siblings;
}

export default function rudder(activatorId) {
  document.addEventListener('click', (e) => {
    const activator = document.querySelector(`#${activatorId}`);
    const parent = activator.parentNode;
    const allSiblings = siblings(activator);
    const parentSiblings = siblings(parent);

    // if we are clicking on one of the rudder items, don't do anything.
    if (e.target !== activator && (allSiblings.includes(e.target) || e.target === parent)) return;

    if (e.target === activator && !activator.classList.contains('close')) {
      parent.classList.add('expand');
      allSiblings.forEach((sibling) => {
        sibling.classList.add('reveal');
      });
      parentSiblings.forEach((sibling) => {
        sibling.classList.add('axis-hidden');
      });
      activator.classList.add('close');
      activator.firstChild.classList.add('animate');
    } else {
      parent.classList.remove('expand');
      allSiblings.forEach((sibling) => {
        sibling.classList.remove('reveal');
      });
      parentSiblings.forEach((sibling) => {
        sibling.classList.remove('axis-hidden');
      });
      activator.classList.remove('close');
      activator.firstChild.classList.remove('animate');
    }
  });
}
