fetch("./assets/cv.json")
.then(data => data.json())
.then(data => {
  const identity = data.identity;
  document.getElementById("name").innerText = identity.name
  document.getElementById("role").innerText = identity.role
  document.getElementById("email").innerText = identity.contact.email
  document.getElementById("phone").innerText = identity.contact.phone
  const address = getAddress(identity.address);
  document.getElementById("address").innerText = address;
  document.getElementById("about").innerText = identity.about;
  document.getElementById("social").innerHTML = getSocialNetwork(identity.socialNetwork);

  // education
  document.getElementById("education").innerHTML = getEducation(data.education);

  // works
  document.getElementById("works").innerHTML = getWorks(data.workExperience);

  // projects
  document.getElementById("projects").innerHTML = getProjects(filter(data.projectExperience, 0, 7));
  document.getElementById("projects-2").innerHTML = getProjects(filter(data.projectExperience, 7, 7));

  // products
  document.getElementById("products").innerHTML = getProducts(data.productDevelopment);

  // skills
  const skill = data.skillDevelopment;
  document.getElementById("programmingLanguages").innerText = toString(skill.programmingLanguages);
  document.getElementById("frameworks").innerText = toString(skill.frameworks);
  document.getElementById("architecture").innerText = toString(skill.architecture);
  document.getElementById("databases").innerText = toString(skill.databases);
  document.getElementById("other").innerText = toString(skill.other);

  window.scrollTo(0, 0);

});

function getAddress(address) {
  return `${address.street}, ${address.subDistrict}, ${address.district}, ${address.city}, ${address.province}, ${address.postCode}`
}

function getSocialNetwork(listSocial) {
  return listSocial.map(social => `<li class="print-hide">${social.icon} <a href="${social.url}" itemprop=\"url\">${social.name} <i class="fas fa-external-link-alt link"></i></a></li>
  <li class="print-show">${social.icon} <a href="${social.url}" itemprop=\"url\">${social.url}</a></li>`).join("\n");
}

function getEducation(listEducation) {
  return listEducation.map(education => `<li><span class="periode">${education.periode}</span>&nbsp;[${education.level} ${education.major}]&nbsp;-&nbsp;${education.company} ${education.location}</li>`).join("\n");
}

function getWorks(listWork) {
  return listWork.map(work => `<li><span class="periode">${work.periode}</span>&nbsp;[${work.role}]&nbsp;-&nbsp;${work.company}</li>`).join("\n");
}

function getProjects(listProject) {
  return listProject.map(project => `<li>
  <b>${project.company} - ${project.aliasName}</b>
  <p class="p-periode">${project.periode}</p>
  <div class="project">
    <div class="project-sub">
      <span class="p-sub">Tech:</span>
    </div>
    <div class="project-desc">
      <span>${project.technology}</span>
    </div>
  </div>
  <div class="project">
    <div class="project-sub">
      <span class="p-sub">Fiture:</span>
    </div>
    <div class="project-desc">
      <span>${project.fitures}</span>
    </div>
  </div>
</li>`).join("\n");
}

function getProducts(listProduct) {
  return listProduct.map(product => {
    let desc = product.description? `<div class="product">
      <div class="product-sub">
        <p class="p-sub">Desc:</p>
      </div>
      <div class="product-desc">
        <p>${product.description}</p>
      </div>
    </div>`: "";
    return `<li>
    <p><b>${product.name}</b>&nbsp;<span class="p-sub">|&nbsp;${product.periode}</span></p>
    <div class="product">
      <div class="product-sub">
        <p class="p-sub">Tech:</p>
      </div>
      <div class="product-desc">
        <p>${product.technology}</p>
      </div>
    </div>
    ${desc}
    </li>`}).join("\n");
}

function toString(list, separation=", ") {
  return list.join(separation);
}

function filter(list, startIndex=0, size=7) {
  const result = [];
  let count = 1;
  for (let index = startIndex; index < list.length; index++) {
    if (size < count) { break; }
    if (count <= size) {
      result.push(list[index]);
      count++;
    }
  }
  return result;
}