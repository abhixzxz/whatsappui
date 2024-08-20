import React from "react";

const ChatComponent = () => {
  return (
    <div>
      {/* Background Header */}
      <div className="w-full h-32" style={{ backgroundColor: "#449388" }}></div>

      {/* Main Container */}
      <div className="container mx-auto" style={{ marginTop: "-128px" }}>
        <div className="py-6 h-screen">
          <div className="flex border border-grey rounded shadow-lg h-full">
            {/* Left Panel */}
            <div className="w-1/3 border flex flex-col">
              {/* Header */}
              <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="http://andressantibanez.com/res/avatar.png"
                    alt="User Avatar"
                  />
                </div>

                <div className="flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#727A7E"
                        d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        opacity=".55"
                        fill="#263238"
                        d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fillOpacity=".6"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="py-2 px-2 bg-grey-lightest">
                <input
                  type="text"
                  className="w-full px-2 py-2 text-sm"
                  placeholder="Search or start new chat"
                />
              </div>

              {/* Contacts */}
              <div className="bg-grey-lighter flex-1 overflow-auto">
                {/* Contact Item */}
                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                  <div>
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                      alt="Contact"
                    />
                  </div>
                  <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div className="flex items-bottom justify-between">
                      <p className="text-grey-darkest">
                        New Movie! Expendables 4
                      </p>
                      <p className="text-xs text-grey-darkest">12:45 pm</p>
                    </div>
                    <p className="text-grey-dark mt-1 text-sm">
                      Get Andrés on this movie ASAP!
                    </p>
                  </div>
                </div>

                {/* Other contacts */}
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer"
                  >
                    <div>
                      <img
                        className="h-12 w-12 rounded-full"
                        src={contact.image}
                        alt={contact.name}
                      />
                    </div>
                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                      <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest">{contact.name}</p>
                        <p className="text-xs text-grey-darkest">12:45 pm</p>
                      </div>
                      <p className="text-grey-dark mt-1 text-sm">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-2/3 border flex flex-col">
              {/* Header */}
              <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                      alt="Chat Avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-grey-darkest">
                      New Movie! Expendables 4
                    </p>
                    <p className="text-grey-darker text-xs mt-1">
                      Andrés, Tom, Harrison, Arnold, Sylvester
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fillOpacity=".5"
                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fillOpacity=".6"
                        d="M1.5 21.8h21v-2.3h-21v2.3zm1-8h19V5.5h-19v8.3zM22 4.2c.3 0 .5.3.5.6v10.2c0 .4-.2.6-.5.6h-20c-.3 0-.5-.3-.5-.6V4.8c0-.4.2-.6.5-.6h20z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#263238"
                        fillOpacity=".6"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-auto"
                style={{ backgroundColor: "#DAD3CC" }}
              >
                {/* Message Container */}
                <div className="py-2 px-3">
                  <div className="flex justify-center mb-2">
                    <div
                      className="rounded py-2 px-4"
                      style={{ backgroundColor: "#DDECF2" }}
                    >
                      <p className="text-sm uppercase">February 20, 2018</p>
                    </div>
                  </div>

                  {/* Left Messages */}
                  <div className="flex mb-2">
                    <div
                      className="rounded py-2 px-3"
                      style={{ backgroundColor: "#F2F2F2" }}
                    >
                      <p className="text-sm text-grey-darkest">Alo</p>
                    </div>
                  </div>

                  {/* Right Messages */}
                  <div className="flex justify-end mb-2">
                    <div
                      className="rounded py-2 px-3"
                      style={{ backgroundColor: "#E2FFC7" }}
                    >
                      <p className="text-sm text-grey-darkest">How are you?</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="bg-grey-lighter px-4 py-4 flex items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#747A7E"
                      d="M1.5 21.8h21v-2.3h-21v2.3zm1-8h19V5.5h-19v8.3zM22 4.2c.3 0 .5.3.5.6v10.2c0 .4-.2.6-.5.6h-20c-.3 0-.5-.3-.5-.6V4.8c0-.4.2-.6.5-.6h20z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1 mx-4">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-2"
                    placeholder="Type a message"
                  />
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#747A7E"
                      d="M1.5 21.8h21v-2.3h-21v2.3zm1-8h19V5.5h-19v8.3zM22 4.2c.3 0 .5.3.5.6v10.2c0 .4-.2.6-.5.6h-20c-.3 0-.5-.3-.5-.6V4.8c0-.4.2-.6.5-.6h20z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const contacts = [
  {
    name: "Jane Doe",
    image: "https://example.com/jane.jpg",
    message: "Hello there!",
  },
  {
    name: "John Smith",
    image: "https://example.com/john.jpg",
    message: "Let's catch up soon.",
  },
  // Add more contacts as needed
];

export default ChatComponent;
