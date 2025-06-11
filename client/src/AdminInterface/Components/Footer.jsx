import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
     <footer class="footer h-16 flex items-center px-6 border-t border-gray-200 mt-auto" style={{backgroundColor:'#F1F5F9'}}>
                <div class="flex md:justify-between justify-center w-full gap-4">
                    <div>
                        <p class="text-sm font-medium"><script>document.write(new Date().getFullYear())</script> © FoodKing</p>
                    </div>
                    <div class="md:flex hidden gap-2 item-center md:justify-end">
                        <p class="text-sm font-medium">Design &amp; Develop by <Link to="" class="text-primary">FAKHIR ZEESHAN</Link></p>
                    </div>
                </div>
            </footer>
    </>
  )
}

export default Footer
