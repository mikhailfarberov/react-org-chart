import React from "react";
import ReactDOM from "react-dom";
import OrgChart from "@mikhailfarberov/react-org-chart";

var tree = [
  {
    id: 11,
    avatar: 'avatar-2.png',
    title: 'Paul',
    subtitle: '',
    descr: '',
    date: 'since 10.03.2020',
    label: 'Chief of Board',
    link: {url: 'https://github.com', text: 'sample link'}, 
    children: [
      {
        id: 12,
        avatar: 'avatar-4.png',
        title: 'Sara',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
      },
      {
        id: 13,
        avatar: 'avatar-2.png',
        title: 'Kevin',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
      },
      {
        id: 14,
        avatar: 'avatar-3.png',
        title: 'James',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
      }
    ]
  },
  {
    id: 1,
    avatar: 'avatar-1.png',
    title: 'Mike',
    subtitle: '',
    descr: '',
    date: 'since 10.03.2020',
    label: 'CEO',
    link: {url: 'https://github.com', text: 'sample link'}, 
    children: [
      {
        id: 2,
        avatar: 'avatar-2.png',
        title: 'John',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
        children: [
          {
              id: 4,
              avatar: 'avatar-3.png',
              title: 'Dave',
              subtitle: '',
              descr: '',
              date: 'since 10.03.2020',
              label: 'Principal Engineer',
              link: {url: 'https://github.com', text: 'sample link'}, 
              children: [
                  {
                      id: 10,
                      avatar: 'avatar-1.png',
                      title: 'Tim',
                      subtitle: '',
                      descr: '',
                      date: 'since 10.03.2020',
                      label: 'Team Lead',
                      link: {url: 'https://github.com', text: 'sample link'}, 
                  }
              ]
          },
          {
              id: 5,
              avatar: 'avatar-4.png',
              title: 'Scally',
              subtitle: '',
              descr: '',
              date: 'since 10.03.2020',
              label: 'Chief Evangelist',
              link: {url: 'https://github.com', text: 'sample link'}, 
          }
        ]
      },
      {
        id: 3,
        avatar: 'avatar-4.png',
        title: 'Mary',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CFO',
        link: {url: 'https://github.com', text: 'sample link'}, 
        children: [
          {
              id: 7,
              avatar: 'avatar-1.png',
              title: 'Don',
              subtitle: '',
              descr: '',
              date: 'since 10.03.2020',
              label: 'Chief accountant',
              link: {url: 'https://github.com', text: 'sample link'}, 
          },
          {
              id: 8,
              avatar: 'avatar-4.png',
              title: 'Helen',
              subtitle: '',
              descr: '',
              date: 'since 10.03.2020',
              label: 'Chief control officer',
              link: {url: 'https://github.com', text: 'sample link'}
          }
        ]
      }
    ]
  }
];

function onItemExpanded(item) {
  alert(`Item #${item.id} has been expanded`);
}

ReactDOM.render(
  <OrgChart 
    tree={tree} 
    collapse={true} 
    onExpandItem={item => onItemExpanded(item)} />,
  document.getElementById("root")
);
