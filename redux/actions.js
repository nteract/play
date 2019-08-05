import * as actionTypes from "./actionTypes";

// Simple actions related to UI state.
export const setCurrentKernelName = payload => ({
  type: actionTypes.SET_CURRENT_KERNEL_NAME,
  payload
});
export const setCurrentServerId = payload => ({
  type: actionTypes.SET_CURRENT_SERVER_ID,
  payload
});
export const setPlatform = payload => ({
  type: actionTypes.SET_PLATFORM,
  payload
});
export const setShowPanel = payload => ({
  type: actionTypes.SET_SHOW_PANEL,
  payload
});
export const setSource = payload => ({
  type: actionTypes.SET_SOURCE,
  payload
});
export const submitBinderForm = payload => ({
  type: actionTypes.SUBMIT_BINDER_FORM,
  payload
});
export const setCodeMirrorMode = payload => ({
  type: actionTypes.SET_CODE_MIRROR_MODE,
  payload
});

// Actions related to servers.
export const activateServer = payload => ({
  type: actionTypes.ACTIVATE_SERVER,
  payload
});
export const activateServerFulfilled = payload => ({
  type: actionTypes.ACTIVATE_SERVER_FULFILLED,
  payload
});
export const activateServerFailed = payload => ({
  type: actionTypes.ACTIVATE_SERVER_FAILED,
  payload
});

export const killServer = payload => ({
  type: actionTypes.KILL_SERVER,
  payload
});
export const killServerFulfilled = payload => ({
  type: actionTypes.KILL_SERVER_FULFILLED,
  payload
});
export const killServerFailed = payload => ({
  type: actionTypes.KILL_SERVER_FAILED,
  payload
});

export const fetchKernelSpecs = payload => ({
  type: actionTypes.FETCH_KERNEL_SPECS,
  payload
});

export const fetchKernelSpecsFulfilled = payload => ({
  type: actionTypes.FETCH_KERNEL_SPECS_FULFILLED,
  payload
});

export const fetchKernelSpecsFailed = payload => ({
  type: actionTypes.FETCH_KERNEL_SPECS_FAILED,
  payload
});

export const addServerMessage = payload => ({
  type: actionTypes.ADD_SERVER_MESSAGE,
  payload
});

// Actions related to kernels.
export const activateKernel = payload => ({
  type: actionTypes.ACTIVATE_KERNEL,
  payload
});
export const activateKernelFulfilled = payload => ({
  type: actionTypes.ACTIVATE_KERNEL_FULFILLED,
  payload
});
export const activateKernelFailed = payload => ({
  type: actionTypes.ACTIVATE_KERNEL_FAILED,
  payload
});

export const interruptKernel = payload => ({
  type: actionTypes.INTERRUPT_KERNEL,
  payload
});
export const interruptKernelFulfilled = payload => ({
  type: actionTypes.INTERRUPT_KERNEL_FULFILLED,
  payload
});
export const interruptKernelFailed = payload => ({
  type: actionTypes.INTERRUPT_KERNEL_FAILED,
  payload
});

export const killKernel = payload => ({
  type: actionTypes.KILL_KERNEL,
  payload
});

// NB: This appears unused. In core there's KILL_KERNEL_SUCCESSFUL, but it deals in KernelRefs rather than serverId/kernelName.
export const killKernelFulfilled = payload => ({
  type: actionTypes.KILL_KERNEL_FULFILLED,
  payload
});
export const killKernelFailed = payload => ({
  type: actionTypes.KILL_KERNEL_FAILED,
  payload
});

export const addKernelMessage = payload => ({
  type: actionTypes.ADD_KERNEL_MESSAGE,
  payload
});
export const addKernelOutput = payload => ({
  type: actionTypes.ADD_KERNEL_OUTPUT,
  payload
});
export const clearKernelOutputs = payload => ({
  type: actionTypes.CLEAR_KERNEL_OUTPUTS,
  payload
});
export const restartKernel = payload => ({
  type: actionTypes.RESTART_KERNEL,
  payload
});
export const runSource = payload => ({
  type: actionTypes.RUN_SOURCE,
  payload
});
export const setActiveKernel = payload => ({
  type: actionTypes.SET_ACTIVE_KERNEL,
  payload
});
export const setActiveKernelLanguageInfo = payload => ({
  type: actionTypes.SET_ACTIVE_KERNEL_LANGUAGE_INFO,
  payload
});
export const setKernelStatus = payload => ({
  type: actionTypes.SET_KERNEL_STATUS,
  payload
});

export const initalizeFromQuery = (payload = {}) => ({
  type: actionTypes.INITIALIZE_FROM_QUERY,
  payload
});
