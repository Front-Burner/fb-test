import { SeoType } from '../components/seo-type'
import {FeatureType} from "@/types/documents/feature-type";

export type PageType = {
	_id: string
	_createdAt: Date
	_updatedAt: Date
	texturedBackground: boolean
	title: string
	slug: {
		current: string
	}
	seo: SeoType
    feature: FeatureType
  navigation: {
    title: string
    navItems: {
      title: string
      route: {
        slug: {
          current: string
        }
      }
    }[]
  }
}
