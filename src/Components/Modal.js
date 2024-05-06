import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

export default function Modal(props) {

  return (
    <>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>props.closeModle}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          {props.image.urls ? (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-8xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center bg-gray-100 justify-end">
                  <button title="Close the Modal" className="px-5 py-3 text-gray-500 focus:outline-none" onClick={props.closeModle}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                    strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" />
                    </svg>
                  </button>
                  </div>
                
                  <div className="flex flex-col lg:flex-row lg:space-x-8 p-5 lg:p-6">
                    <div className="w-full lg:w-2/3">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500"></p>
                          <p>
                            <img className="rounded" src={props.image.urls.regular} loading='lazy' />
                          </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/3 px-2">
                      <h3 className="border-b text-xl mt-3 lg:mt-0 lg:text-2xl font-semibold mb-2 lg:mb-5 pb-3 lg:pb-5 text-gray-500">Details</h3>
                      <span className="mb-2 text-gray-500">Photo taken by</span>
                      <figcaption className="flex items-center space-x-4 mb-5 mt-2">
                        <img src={props.image.user.profile_image.medium} alt="" className="flex-none w-14 h-14 rounded-full object-cover" loading="lazy"/>
                        <div className="flex-auto">
                            <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                                {props.image.user.name}
                            </div>
                            <div className="mt-0.5 text-gray-500 text-xs">{props.image.user.location}</div>
                        </div>
                    </figcaption>
                      <p>
                        <span className="text-gray-700 font-semibold">Author:</span> {props.image.user.name}
                      </p>
                      <p>
                        <span className="text-gray-700 font-semibold">Location:</span> {props.image.user.location}
                      </p>
                      <p>
                        <span className="text-gray-700 font-semibold">Total likes: </span> {props.image.user.total_likes}
                      </p>
                      <p>
                        <span className="text-gray-700 font-semibold">Total photos: </span> {props.image.user.total_photos}
                      </p>
                      <div className="my-5">
                        <a href={props.image.links.download} target='_blank' className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">View original Image</a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        ):''}
        </Dialog>
      </Transition>
    </>
  );
}
